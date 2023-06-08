import React from "react";
import { CustomContentButton } from "../../UI/CustomContentButton/CustomContentButton";
import { CustomInput } from "../../UI/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import s from "./SearchUsers.module.css";
import { requestUsers, actions} from '../../redux/usersReducer';
import { useAppDispatch } from '../../Hooks/useAppDispatch';


const SearchUsers: React.FC = () => {

  type UserSubmitForm = {
    searchData: ''
  }

  const { register, handleSubmit } = useForm<UserSubmitForm>({
    mode: "onBlur",
  })

  const dispatch = useAppDispatch()

  const onSubmit = (data: UserSubmitForm) => {
    const searchData = data.searchData
    // { ...data.filter }

    // switch (filter.isFriend as unknown as string) {
    //   case 'null':
    //     filter.isFriend = null;
    //     break;      
    //   case 'false':
    //     filter.isFriend = false;
    //     break;      
    //   case 'true':
    //     filter.isFriend = true;
    //     break;
    // }

    dispatch(actions.setCurrentPage(1))
    dispatch(requestUsers(searchData))

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.searchUsersForm}>
      <div className={s.formField}>
        <CustomInput
          type="text"
          placeholder='Search users by name...'
          {...register("searchData")}
        />
      </div>
      {/* <div className={s.formSelect}>
      <select {...register("friend")}>
        <option value=''>All users</option>
        <option value='true'>Followed users</option>
        <option value='false'>Unfollowed users</option>
      </select>
      </div> */}
      <div className={s.searchButton}>
        <CustomContentButton type="submit">Search</CustomContentButton>
      </div>
    </form>)
}

export default SearchUsers;
