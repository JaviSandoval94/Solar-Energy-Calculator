# Import Dependencies
import pandas as pd
from flask import Flask, render_template, redirect, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
import os

# Engine creation (connection to the database on Heroku)
engine = create_engine(
    f'postgres://ogvkfyvwchvejb:23b5b47aec43cb838657a2c0cff2e8f12bbbb8b08832674f5c5d714795036a0e@ec2-52-1-95-247.compute-1.amazonaws.com:5432/d5s0tg8iqlu20i')

app = Flask(__name__)
CORS(app, support_credentials=True)


def graphData(solar_daily, solar_sites):

    # ------------------------------------------- First Visualization ------------------------------------------------
    day = pd.DataFrame(solar_daily)
    site = pd.DataFrame(solar_sites)

    combined = pd.merge(day, site, on="id", how="left").to_dict("index")

    return jsonify(combined)


def lineData(data):
    data['date'] = pd.to_datetime(data['date'], errors='coerce')
    data['year'] = data['date'].dt.year
    day = data[['id', 'year', 'specific_prod(kWh/kWp)']]
    day_avg = day.groupby(['id', 'year']).mean().reset_index()
    day_json = day_avg.to_json(orient="records")
    return day_json


@app.route("/")
@cross_origin(supports_credentials=True)
def index():

    return render_template("index.html")


@app.route("/api/solar")
@cross_origin(supports_credentials=True)
def solar():
    conn = engine.connect()
    solar_daily = pd.read_sql("SELECT * FROM daily_data;", conn)
    solar_sites = pd.read_sql("SELECT * FROM sites", conn)
    data = graphData(solar_daily, solar_sites)
    conn.close()
    return data


@app.route("/api/line")
@cross_origin(supports_credentials=True)
def solar_line():
    conn = engine.connect()
    solar_daily = pd.read_sql("SELECT * FROM daily_data;", conn)
    data_json = lineData(solar_daily)
    conn.close()
    return data_json


if __name__ == "__main__":
    app.run(debug=True)
