import addresses from "../service/address-service.js";

const createAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const contactId = req.params.contactId;

    const result = await addresses.createAddress(user, contactId, request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    const result = await addresses.getaddressValidation(
      user,
      contactId,
      addressId
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;
    const request = req.body;
    request.id = addressId;

    const result = await addresses.updateAddress(user, contactId, request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const removeAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    const result = await addresses.removeAddress(user, contactId, addressId);

    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};
const listAddress = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    const result = await addresses.listAddress(user, contactId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  createAddress,
  getAddress,
  updateAddress,
  removeAddress,
  listAddress,
};
