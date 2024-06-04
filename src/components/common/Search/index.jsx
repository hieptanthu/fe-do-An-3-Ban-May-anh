import classNames from "classnames/bind";
import style from './style.model.scss';

const cx = classNames.bind(style);

function Search() {
  return (
    <>
      <input type="text" placeholder="seach" />
    </>
  );
}

export default Search;
