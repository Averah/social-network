import React, { useEffect } from "react";
import { CustomContentButton } from "../../UI/CustomContentButton/CustomContentButton";
import { CustomInput } from "../../UI/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import s from "./SearchUsers.module.css";
import { requestUsers, actions } from '../../redux/usersReducer';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { AppStateType } from "../../redux/redux-store";


type UserSubmitForm = {
  searchData: string
  friend: string
}
const SearchUsers: React.FC = React.memo(() => {

  const filterData = useSelector((state: AppStateType) => state.usersPage.filter)
  const dispatch = useAppDispatch()
  const { register, handleSubmit, setValue } = useForm<UserSubmitForm>({
    mode: "onBlur",
    defaultValues: filterData
  })

  const onSubmit = (data: UserSubmitForm) => {
    dispatch(actions.setCurrentPage(1))
    dispatch(actions.setFilterData(data))
    dispatch(requestUsers())
  }

  const onResetClick = () => {
    const filter = {
      searchData: '',
      friend: ''
    }
    dispatch(actions.setFilterData(filter))
    dispatch(actions.setCurrentPage(1))
    dispatch(requestUsers())

  }
  useEffect(() => {
    setValue('searchData', filterData.searchData)
    setValue('friend', filterData.friend)
  }, [filterData.friend, filterData.searchData, setValue])

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={s.searchUsersForm}>
      <div className={s.formField}>
        <CustomInput
          type="text"
          placeholder='Search users by name...'
          {...register("searchData")}
        />
      </div>
      <div className={s.formSelect}>
        <select className={s.usersSelect} {...register("friend")}>
          <option value=''>All users</option>
          <option value='true'>Followed users</option>
          <option value='false'>Unfollowed users</option>
        </select>
      </div>
      <div className={s.searchButton}>
        <CustomContentButton type="submit">Search</CustomContentButton>
      </div>
      <div className={s.resetButton}>
        <CustomContentButton type="button"
          onClick={onResetClick}>Reset</CustomContentButton>
      </div>
    </form>)
})

export default SearchUsers;
