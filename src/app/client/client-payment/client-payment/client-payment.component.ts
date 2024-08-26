
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/Servies/Users/user-auth.service';

declare var Razorpay: any; // Correct declaration
@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent implements OnInit {

  technician: any;
  slot: any;
  selectedPaymentMethod: string = '';
  paymentForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder,private auth:UserAuthService) {
    this.paymentForm = this.fb.group({
      fieldName: ['', Validators.required],
      houseName: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]], // Indian pincode pattern
      phoneNumber: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]] // Indian phone number pattern
    });
  }

  ngOnInit(): void {
    // Retrieve and deserialize the data from localStorage
    const techData = localStorage.getItem('tech-data');
    const slotData = localStorage.getItem('slot-data');

    if (techData) {
      this.technician = JSON.parse(techData);
    }

    if (slotData) {
      this.slot = JSON.parse(slotData);
    }

    console.log('Technician data:', this.technician);
    console.log('Slot data:', this.slot);
  }

  payNow() {

    if(this.selectedPaymentMethod=='razropay'){

      console.log('Form Data:', this.paymentForm.value); // Log the form data

      console.log(this.selectedPaymentMethod, "this is selected method");

  
    const options = {
      key: 'rzp_test_JUqE3YHK16DGXY', // Replace with your Razorpay Key ID
      amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'FindTech',
      description: 'Payment for Technician ',
      Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXcxUd9hZNZtZnZuZokO1NfO0tmFA66FEnqg&s",
      handler: (response: any) => {
        console.log(response);
       
        this.successCallback(response);
      },
      prefill: {
        name: 'jackson R', // Replace with customer name
        email: 'jacksonjack333r@gmail.com', // Replace with customer email
        contact: '7356575638' // Replace with customer phone number
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#F37254'
      }
    };



    const rzp = new Razorpay(options);
    rzp.on('payment.failed', this.failureCallback);
    rzp.open();
    
  }
  
}

successCallback(response: any) {
  console.log('Payment Successful:', response);
  const formData = this.paymentForm.value;
  formData.slotId = this.slot._id;

  const bookingData = {
    userId: localStorage.getItem('Userid'), // Assuming user ID is stored in localStorage
    status: 'Confirmed',
    paymentMethod:'Online',
    transactionStatus: 'Success',
    transactionId: response.razorpay_payment_id,
    amount: 500, // The amount should be dynamic
  };

  console.log(formData, "this is the data gonna pass");

  this.auth.addAddress_slotbook({ ...formData, ...bookingData })
    .subscribe(
      (result) => {
        console.log('Address and slot booking successful:', result);

        localStorage.removeItem('slot-data')
        this.router.navigate(['/payment-success'], { queryParams: { slotId: this.slot._id } });
      },
      (error) => {
        console.error('Error in address and slot booking:', error);
        // Handle error if needed
      }
    );
}
failureCallback(response: any, rzpInstance: any) {
  console.error('Payment Failed:', response);

  // Close the Razorpay popup
  rzpInstance.close();

  // Prepare data for booking with 'Failed' status
  const formData = this.paymentForm.value;
  formData.slotId = this.slot._id;

  const bookingData = {
    userId: localStorage.getItem('Userid'),
    status: 'Failed', // Set the status to 'Failed'
    paymentMethod: 'Online',
    transactionStatus: 'Failed', // Set the transaction status to 'Failed'
    transactionId: response.error.metadata.payment_id, // Update to correctly retrieve payment_id from error metadata
    amount: 500, // Adjust the amount dynamically as needed
  };

  console.log('Data to be sent for failed booking:', formData, bookingData);

  // Call your service to add address and slot booking with 'Failed' status
  const bookingObservable = this.auth.addAddress_slotbook({ ...formData, ...bookingData });

  // Subscribe to the observable
  bookingObservable.subscribe(
    (result) => {
      console.log('Address and slot booking with failed transaction:', result);
      localStorage.removeItem('slot-data');
      localStorage.removeItem('tech-data')
      // Navigate to the payment method page or handle as needed
      this.router.navigate(['/paymentmethod']);
    },
    (error) => {
      console.error('Error in address and slot booking with failed transaction:', error);
      // Handle error if needed
      alert('Error occurred while processing failed payment. Please try again.');
      // Optionally, navigate to a specific page or handle the error state in UI
      this.router.navigate(['/paymentmethod']);
    }
  );
}





  
}