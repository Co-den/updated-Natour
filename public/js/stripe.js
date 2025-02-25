/* eslint-disable */
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    console.log('Getting checkout session for tour:', tourId);
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    console.log('Redirecting to checkout');
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log('Error booking tour:', err);
    showAlert('error', err);
  }
};
