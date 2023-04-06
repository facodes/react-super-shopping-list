import { UPDATE_SHOPPINGLISTS } from "./types";
import { URL } from "../API";

import { setLoading } from "./control";

export const addNewItem = (payload) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const shoppingList = getState().control.shoppingListSelected;
    const res = await fetch(`${URL}/user/${shoppingList._id}/item`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": getState().control.authToken,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      const shoppingLists = getState().user.shoppingLists;
      const foundIndex = shoppingLists.findIndex(
        (sl) => sl._id === shoppingList._id
      );
      shoppingLists[foundIndex].items = [...data.items];
      dispatch({
        type: UPDATE_SHOPPINGLISTS,
        payload: { shoppingLists },
      });
      dispatch(setLoading(false));
      Promise.resolve();
    } else {
      dispatch(setLoading(false));
      return Promise.reject();
    }
  };
};

export const updateItem = (payload) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const shoppingList = getState().control.shoppingListSelected;
    const res = await fetch(
      `${URL}/user/${shoppingList._id}/${payload.itemId}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getState().control.authToken,
        },
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      const shoppingLists = getState().user.shoppingLists;
      const foundIndex = shoppingLists.findIndex(
        (sl) => sl._id === shoppingList._id
      );
      shoppingLists[foundIndex].items = [...data.items];
      dispatch({
        type: UPDATE_SHOPPINGLISTS,
        payload: { shoppingLists },
      });
      dispatch(setLoading(false));
      Promise.resolve();
    } else {
      dispatch(setLoading(false));
      return Promise.reject();
    }
  };
};

export const removeItem = (itemId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const shoppingList = getState().control.shoppingListSelected;
    const res = await fetch(`${URL}/user/${shoppingList._id}/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": getState().control.authToken,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      const shoppingLists = getState().user.shoppingLists;
      const foundIndex = shoppingLists.findIndex(
        (sl) => sl._id === shoppingList._id
      );
      shoppingLists[foundIndex].items = [...data.items];
      dispatch({
        type: UPDATE_SHOPPINGLISTS,
        payload: { shoppingLists },
      });
      dispatch(setLoading(false));
      return Promise.resolve();
    } else {
      dispatch(setLoading(false));
      return Promise.reject();
    }
  };
};

export const toggleTodoDone = (itemId) => {
  return async (dispatch, getState) => {
    const shoppingList = getState().control.shoppingListSelected;
    const res = await fetch(`${URL}/user/${shoppingList._id}/${itemId}/done`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": getState().control.authToken,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      const shoppingLists = getState().user.shoppingLists;
      const foundIndex = shoppingLists.findIndex(
        (sl) => sl._id === shoppingList._id
      );
      shoppingLists[foundIndex].items = [...data];
      dispatch({
        type: UPDATE_SHOPPINGLISTS,
        payload: { shoppingLists },
      });
    }
  };
};
