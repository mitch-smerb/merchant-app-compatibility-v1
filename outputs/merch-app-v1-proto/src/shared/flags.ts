const flags = {
  requireAddressOnSignup: JSON.parse(
    process.env.VITE_FLAG_REQUIRE_ADDRESS_ON_SIGNUP || 'false'
  ) as boolean
};

export default flags;
