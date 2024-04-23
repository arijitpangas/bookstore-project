import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function CheckoutForm() {
  const appContext = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
    landmark: "",
    paymentMethod: "",
    totalCartValue: appContext.cartTotal,
    products: appContext.cartItems,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  // Regex pattern for Indian phone numbers (10 digits starting with 7, 8, or 9)
  const indianPhoneNumberPattern = /^[6789]\d{9}$/;

  // Function to check if a phone number is valid
  const isPhoneNumberValid = (phoneNumber) => {
    return indianPhoneNumberPattern.test(phoneNumber);
  };

  // Function to check if an email address is valid
  const isEmailValid = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Regex pattern for Indian PIN codes (6 digits)
  const indianPinCodePattern = /^\d{6}$/;

  // Function to check if a PIN code is valid
  const isPinCodeValid = (pinCode) => {
    return indianPinCodePattern.test(pinCode);
  };

  const cardNumberPattern = /^\d{16}$/;
  const cardExpiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvPattern = /^\d{3}$/;

  // Functions to check if card details are valid
  const iscardNumberValid = (cardNumber) => {
    return cardNumberPattern.test(cardNumber);
  };

  const isCardExpiryValid = (cardExpiry) => {
    return cardExpiryPattern.test(cardExpiry);
  };

  const isCVVValid = (cvv) => {
    return cvvPattern.test(cvv);
  };

  const isUpiIdValid = (upiId) => {
    // Regular expression for UPI ID validation
    const upiIdPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/;
    return upiIdPattern.test(upiId);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border text-black rounded-md ${
                isPhoneNumberValid(formData.phoneNumber)
                  ? "border-gray-300"
                  : "border-red-500"
              }`}
              required
            />
            {!isPhoneNumberValid(formData.phoneNumber) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid phone number.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email ID *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md text-black ${
                isEmailValid(formData.email)
                  ? "border-gray-300"
                  : "border-red-500"
              }`}
              required
            />
            {!isEmailValid(formData.email) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email ID.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="addressLine1" className="block text-sm font-medium">
              Address Line 1 *
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="addressLine2" className="block text-sm font-medium">
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pinCode" className="block text-sm font-medium">
              PIN Code *
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className={`mt-1 p-2 w-full text-black border rounded-md ${
                isPinCodeValid(formData.pinCode)
                  ? "border-gray-300"
                  : "border-red-500"
              }`}
              required
            />
            {!isPinCodeValid(formData.pinCode) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid Indian PIN code.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="landmark" className="block text-sm font-medium">
              Landmark
            </label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
            >
              <option value="">Select Payment Method</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="UPI">UPI ID</option>
            </select>
          </div>
        </div>

        {formData.paymentMethod === "Card" && (
          <React.Fragment>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium">
                Credit/Debit Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border text-black rounded-md ${
                  iscardNumberValid(formData.cardNumber)
                    ? "border-gray-300"
                    : "border-red-500"
                }`}
                required
              />
              {!iscardNumberValid(formData.cardNumber) && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid 16-digit credit/debit card number.
                </p>
              )}
            </div>

            {/* Card Expiry */}
            <div className="mb-4">
              <label htmlFor="cardExpiry" className="block text-sm font-medium">
                Card Expiry (MM/YY)
              </label>
              <input
                type="text"
                id="cardExpiry"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleChange}
                className={`mt-1 p-2 w-full text-black border rounded-md ${
                  isCardExpiryValid(formData.cardExpiry)
                    ? "border-gray-300"
                    : "border-red-500"
                }`}
                placeholder="MM/YY"
                required
              />
              {!isCardExpiryValid(formData.cardExpiry) && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid expiry date (MM/YY).
                </p>
              )}
            </div>

            {/* CVV */}
            <div className="mb-4">
              <label htmlFor="cvv" className="block text-sm font-medium">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border text-black rounded-md ${
                  isCVVValid(formData.cvv)
                    ? "border-gray-300"
                    : "border-red-500"
                }`}
                required
              />
              {!isCVVValid(formData.cvv) && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid 3-digit CVV.
                </p>
              )}
            </div>
            {/* ... */}
          </React.Fragment>
        )}

        {formData.paymentMethod === "UPI" && (
          <div className="mb-4">
            <label htmlFor="upiId" className="block text-sm font-medium">
              UPI ID *
            </label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md text-black ${
                isUpiIdValid(formData.upiId)
                  ? "border-gray-300"
                  : "border-red-500"
              }`}
              required
            />
            {!isUpiIdValid(formData.upiId) && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid UPI ID.
                </p>
              )}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        >
          Proceed to pay
        </button>
      </form>
    </div>
  );
}
