import {
  SET_REPOS,
  EDIT_REPO,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  CHANGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER,
} from "../types";
import { toast } from "react-toastify";
import { ApiAction } from "../../utils/apiActions";
const initState = {};
type Repo = {
  id: string;
};
const repoReducer = (
  state = initState,
  action: { type: string; payload: any }
) => {
  let newState: { [x: string]: Repo }, payload;

  switch (action.type) {
    case SET_REPOS: {
      newState = {};
      // eslint-disable-next-line array-callback-return
      action.payload.map((repo: Repo) => {
        newState[repo.id] = repo;
      });
      return newState;
    }
    case EDIT_REPO: {
      console.log("action.payload", action.payload);
      state[action.payload.id] = {
        ...state[action.payload.id],
        name: action.payload.name,
        bgColor: action.payload.bgColor,
      };
      console.log(state);
      return { ...state };
    }
    case ADD_ITEM: {
      let listSelected = state[action.payload.repoId].lists.find(
        (list, index) => list.id === action.payload.listId
      );
      let listIndex = state[action.payload.repoId].lists.findIndex(
        (list, index) => list.id === action.payload.listId
      );
      listSelected.cards.push(action.payload.data);
      state[action.payload.repoId].lists[listIndex].cards = listSelected.cards; //replace current cards on the selected list with the new push cards
      return { ...state };
    }
    case EDIT_ITEM: {
      const { cardIndex, listIndex, repoId, card } = action.payload;
      state[repoId].lists[listIndex].cards[cardIndex] = card;
      return { ...state };
    }
    case DELETE_ITEM: {
      const { listIndex, cardId, repoId } = action.payload;
      state[repoId].lists[listIndex].cards = state[repoId].lists[
        listIndex
      ].cards.filter((card) => card.id !== cardId);
      return { ...state };
    }
    case CHANGE_ITEM_POSITION_IN_DIFFERNT_CONTAINER: {
      let {
        repoId,
        sourceColumbId,
        destinationColumnId,
        sourceItemIndex,
        destinationItemIndex,
      } = action.payload;
      const listIndexSource = state[repoId].lists.findIndex(
        (list) => list.title === sourceColumbId
      );
      const listIndexDestination = state[repoId].lists.findIndex(
        (list) => list.title === destinationColumnId
      );
      const listDestinationId = state[repoId].lists[listIndexDestination].id;
      //grab itemArrIndex which change
      const item = state[repoId].lists[listIndexSource].cards[sourceItemIndex];
      // remove itemArrIndex from source columb
      state[repoId].lists[listIndexSource].cards.splice(sourceItemIndex, 1);

      //remove item
      delete state[repoId].lists[listIndexSource].cards[item];
      // // add item in destination columb
      state[repoId].lists[listIndexDestination].cards.splice(
        destinationItemIndex,
        0,
        item
      );
      (async () => {
        if (item.noteTicket) {
          const { statusCode, data } = await ApiAction.postRequest(
            `/list/${listDestinationId}/card`,
            {
              text: item.text,
              noteTicket: item.noteTicket,
            }
          );
          if (statusCode === 400 || statusCode === 500) {
            toast.error(data);
            return;
          }
          toast(
            `Congrats!, new ticket have been moved under ${state[repoId].lists[listIndexDestination].title} column`
          );
        } else {
          const { statusCode, data } = await ApiAction.postRequest(
            `/list/${listDestinationId}/card`,
            {
              text: item.text,
            }
          );
          if (statusCode === 400 || statusCode === 500) {
            toast.error(data);
            return;
          }
          toast(
            `Congrats!, new ticket have been moved under ${state[repoId].lists[listIndexDestination].title} column`
          );
        }

        return { ...state };
      })();

      return { ...state };
    }
    default:
      return state;
  }
};
export default repoReducer;
