const stripe = require('stripe')(process.env.stripe_key);
import {success, failure} from "./libs/response-lib";

export async function main(event, context, callback){
   
   
   
    try{
            
    if (
        event.body &&
        event.body.stripeEmail &&
        event.body.stripeToken && 
        event.body.stripeAmt
    ) {
        stripe.customers
          .create({
              email: event.body.stripeEmail,
              source: event.body.stripeToken
          })
          .then(customer => {
              context.log('staring the stripe charge');
              stripe.charges.create({
                  amount: event.body.stripeAmt,
                  description:'Sample Charge',
                  currency: 'usd',
                  customer: customer.id
              });
          })
          .then(charge =>{
              context.log('finished the stripe charge');
              callback(null, success({status:true}));
          })
          
    }
    }
    catch(e){
        
            callback(null, failure({message:e.message}));
      
    }
}