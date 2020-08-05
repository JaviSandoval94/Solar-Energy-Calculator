# Import Dependencies
import pandas as pd
from flask import Flask, render_template, redirect, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
import os
 
# Engine creation (connection to the database on Heroku)
engine = create_engine(f'postgres://ogvkfyvwchvejb:23b5b47aec43cb838657a2c0cff2e8f12bbbb8b08832674f5c5d714795036a0e@ec2-52-1-95-247.compute-1.amazonaws.com:5432/d5s0tg8iqlu20i')

app = Flask(__name__)
CORS(app, support_credentials=True)

def graphData(solar_daily, solar_sites):
    
    #------------------------------------------- First Visualization ------------------------------------------------
    # day = pd.DataFrame(solar_daily).to_dict("index")
    # site = pd.DataFrame(solar_sites).to_dict("index")
    day = pd.DataFrame(solar_daily)
    site = pd.DataFrame(solar_sites)
    
    day_avg = day.groupby(["id"])["specific_prod(kWh/kWp"].mean()
    return day_avg
    
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

if __name__ == "__main__":
    app.run(debug = True)