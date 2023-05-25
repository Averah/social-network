// import { connect } from "react-redux";
// import { compose } from "redux";
// import {addDialogsMessageActionCreator} from "../../redux/dialogsReducer";
// import { withAuthRedirect } from "../HOC/withAuthRedirect";
// import Dialogs from './Dialogs';
// import { AppStateType } from '../../redux/redux-store';

// let mapStateToProps = (state:AppStateType):MapStatePropsType => {
//   return {
//     dialogsPage: state.dialogsPage,
//   };
// };

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addMessage: () => {
//       dispatch(addDialogsMessageActionCreator());
//     }
//   };
// };

// // let AuthRedirectComponent = withAuthRedirect(Dialogs)

// // const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   withAuthRedirect
// )(Dialogs);
