const rules = {
  email: [
    {
      required: true,
      message: "Please enter Email",
    },
    { required: true, type: "email", message: "Please use a valid Email format" },
  ],
  password: [
    {
      min: 8,
      message: "At least 8 character",
    },
  ],
  username: [
    {
      required: true,
      message: "Please enter Username",
    },
  ],
};

export default rules;
