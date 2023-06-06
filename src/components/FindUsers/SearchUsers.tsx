import React from "react";
import { CustomContentButton } from "../../UI/CustomContentButton/CustomContentButton";
import { CustomInput } from "../../UI/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import s from "./SearchUsers.module.css";
import { requestUsers, actions } from '../../redux/usersReducer';
import { useAppDispatch } from '../../Hooks/useAppDispatch';


const SearchUsers: React.FC = () => {

  type UserSubmitForm = {
    searchInput: string
  }

  const { register, handleSubmit } = useForm<UserSubmitForm>({
    mode: "onBlur",
  })

  const dispatch = useAppDispatch()

  const onSubmit = (data: UserSubmitForm) => {
    const searchData = data.searchInput
    dispatch(actions.setCurrentPage(1))
    dispatch(requestUsers(searchData))

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.searchUsersForm}>
      <div className={s.formField}>
        <CustomInput
          id="searchInput"
          type="text"
          placeholder='Search users by name...'
          {...register("searchInput")}
        />
      </div>
      <div className={s.searchButton}>
        <CustomContentButton type="submit">Search</CustomContentButton>
      </div>
    </form>)
}








//   return (
//     <div className={s.searchUsers}>
//       <CustomInput className={s.searchUsersInput} placeholder='Search users by name...' />
//       <CustomContentButton className={s.searchButton} onClick={getFilteredUsers}>Search</CustomContentButton>
//     </div>
//   );
// };

export default SearchUsers;
