import { prismaClient } from "../aplication/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  removeAddreessValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const checkContactMustExists = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return contactId;
};

const createAddress = async (user, contactId, request) => {
  contactId = await checkContactMustExists(user, contactId);
  const address = validate(createAddressValidation, request);
  address.contact_id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const getaddressValidation = async (user, contactId, addressId) => {
  contactId = contactId = await checkContactMustExists(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, "address is not found");
  }

  return address;
};

const updateAddress = async (user, contactid, request) => {
  contactid = await checkContactMustExists(user, contactid);
  const address = validate(updateAddressValidation, request);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactid,
      id: address.id,
    },
  });

  if (totalAddressInDatabase != 1) {
    throw new ResponseError(404, "Address is not found");
  }

  return prismaClient.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const removeAddress = async (user, contactId, addressId) => {
  contactId = await checkContactMustExists(user, contactId);
  addressId = validate(removeAddreessValidation, addressId);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId,
    },
  });

  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, "Address is not found");
  }
  return prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

const listAddress = async (user, contactid) => {
  contactid = await checkContactMustExists(user, contactid);
  return prismaClient.address.findMany({
    where: {
      contact_id: contactid,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

export default {
  createAddress,
  getaddressValidation,
  updateAddress,
  removeAddress,
  listAddress,
};
