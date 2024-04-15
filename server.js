// // 

// const express = require('express');
// const bodyParser = require('body-parser');
// const stripe = require('stripe')('sk_test_51P25QpSGaiVkXaAVjsIn72agwgyaTQlZ7t3sE8lHBD4YQclxxy0khXqR0Py1ML8E3NbvCsXOEoZoVrw7JJtONWBS00Ei1MwcSe');

// const app = express();

// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.post('/api/register', async (req, res) => {
//   try {
//     // Process payment (Stripe integration)
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 50000, // Amount in cents (500 Rs)
//       currency: 'inr',
//       description: 'Online class registration fee',
//       payment_method: req.body.paymentMethodId,
//       confirm: true,
//     });

//     // Send response
//     res.json({ success: true, message: 'Registration and payment successful' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Error processing registration and payment' });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51P25QpSGaiVkXaAVjsIn72agwgyaTQlZ7t3sE8lHBD4YQclxxy0khXqR0Py1ML8E3NbvCsXOEoZoVrw7JJtONWBS00Ei1MwcSe');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/register', async (req, res) => {
  try {
    // Extract data from request
    const { paymentMethodId, courseFee } = req.body;

    // Process payment (Stripe integration)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: courseFee * 100, // Amount in cents
      currency: 'inr',
      description: 'Online class registration fee',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Record payment in your database (placeholder code)
    // Replace this with your actual database logic
    // For example, using Mongoose with MongoDB
    // const payment = await Payment.create({ amount: courseFee, paymentIntentId: paymentIntent.id });

    // Send response
    res.json({ success: true, message: 'Registration and payment successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error processing registration and payment' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
