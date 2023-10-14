import { OTPSearch, RegisterSubmit, UserProfile } from "@/common.type";
import {
  createOTPMutation,
  createUserMutation,
  getOTPQuery,
  getUserByEmailQuery,
  updateOTPMutation,
  updateUserMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";
import { hashPassword } from "./bcryptjs";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";
const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};
const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const createNewUser = (userData: {
  email: string;
  password?: string;
  username?: string;
  avatarUrl?: string;
}) => {
  let variables: { [index: string]: any };
  if (userData.password) {
    const hash = hashPassword(userData.password);
    variables = {
      input: {
        ...userData,
        password: hash,
      },
    };
  } else {
    variables = {
      input: {
        ...userData,
      },
    };
  }

  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(createUserMutation, variables);
};

export const updateUserByEmail = (
  email: string,
  userQuery: Partial<UserProfile>
) => {
  if (userQuery.password) userQuery.password = hashPassword(userQuery.password);

  const variables = {
    email,
    input: userQuery,
  };
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(updateUserMutation, variables);
};

export const getUserByEmail = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserByEmailQuery, { email });
};

export const getOTPByEmail = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getOTPQuery, {
    email,
    expireAt: new Date().toISOString(),
  });
};

export const createOTP = (
  code: string,
  email: string,
  type: string,
  expireAt: string
) => {
  const variables = {
    input: {
      code,
      email,
      type,
      expireAt,
    },
  };
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(createOTPMutation, variables);
};

export const updateOTP = (id: string) => {
  const variables = {
    id,
    input: {
      verified: true,
    },
  };
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(updateOTPMutation, variables);
};
