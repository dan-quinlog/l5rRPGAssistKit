import {
  faSpinner, faEdit, faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
  return library.add(faSpinner, faEdit, faTrashAlt);
};

export default Icons;