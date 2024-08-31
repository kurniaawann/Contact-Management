import { prismaClient } from "../aplication/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
  searchhContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const createContact = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;
  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      frist_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const getContactById = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  console.log(user.email);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      frist_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "contact is not found");
  }
  return contact;
};

const updateContact = async (user, request) => {
  const contact = validate(updateContactValidation, request);
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }
  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      frist_name: contact.frist_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      frist_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const totalInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }
  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const searchContactApi = async (user, request) => {
  request = validate(searchhContactValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];
  filters.push({
    username: user.username,
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          frist_name: {
            contains: request.name,
          },
          last_name: {
            contains: request.name,
          },
        },
      ],
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }
  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_items: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  createContact,
  getContactById,
  updateContact,
  remove,
  searchContactApi,
};
