import { parse } from 'json2csv';
import test from "./test.json"  assert {type: "json"}; //41
import main from "./amring.json"  assert {type: "json"}; //10676
import fs from 'fs';
import axios from "axios"
import qs from 'qs';

// console.log(Object.keys(test.Result[0]))

const fields = [
  'ProdType',
  'ProdTypeExtra',
  'ProdTypeDesc',
  'ProductNo',
  'EanCode',
  'MfrPn',
  'Description',
  'Brand',
  'Width',
  'Profile',
  'Inches',
  'DimensionDesc',
  'Pattern',
  'LoadIndex',
  'SpeedIndex',
  'Season',
  'StuddedFrictionDesc',
  'FuelGripNoise',
  'Noise',
  'ET',
  'CenterBore',
  'Material',
  'ConstructionColor',
  'Runflat',
  'ExtraInfo',
  'StockValueWarehouse1',
  'StockValueWarehouse2',
  'StockValueWarehouse3',
  'PriceWarehouse1',
  'PriceWarehouse2',
  'PriceWarehouse3',
  'Warehouse1Description',
  'Warehouse2Description',
  'Warehouse3Description',
  'ListPrice',
  'ImageUrl',
  'EprelRegistrationNumber',
  'SevereSnowTire',
  'IceTire',
  'TireClass',
  'EprelLabelUrl'
];


 
var token = {token:""}

axios({
  method:"post",
  url:"http://amring-test-api.azurewebsites.net/token",
  headers: {
    'Content-Type': "application/x-www-form-urlencoded",
  },
  data:qs.stringify({
   "grant_type":"password",
   "username":"402641",
   "password":"LveqjekPt1zw"
 }),
}).then(res=>{
  let {access_token} = res.data;
        if(access_token){
          axios({
          method: 'GET',
          url:"http://amring-test-api.azurewebsites.net/api/Articles/GetProducts",
           headers: {
            Authorization: "Bearer "+access_token,
          },
        }).then(res=>{
           data = res.data.Result;
            console.log(res.data)
              console.log(res.status);
         
            let opts = { fields };
            let csv = parse(data, opts);
              fs.writeFileSync('main1.csv', csv);
        }).catch(error=>{
          if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
        })
  }
  return null;
}).catch(err=>{
  console.log(err)
})








