import { AppContext } from "./AppContext.jsx";
import { useContext, useEffect } from "react";
export default function Item({ collection, changeTopBox, changeBottomBox }) {
  const { isLoading, currentItem, setCurrentItem } = useContext(AppContext);

  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log("change2");
      if (!isLoading && currentItem) {
        changeTopBox(currentItem);
        changeBottomBox(currentItem);
      }
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, currentItem, changeTopBox, changeBottomBox]);

  function moreDetails(item) {
    console.log("more");
    setCurrentItem(item);
  }
  return (
    <div>
      {collection.map((item, index) => (
        <div
          className="sidebar-item"
          id={index}
          onClick={() => moreDetails(item)}
        >
          <h5 className="sidebar-item-title">
            {item.title.indexOf("-") !== -1
              ? item.title.substring(0, item.title.indexOf("-"))
              : item.title}
          </h5>
          <h6 className="sidebar-item-title">{item.company.display_name}</h6>
          <h6 className="sidebar-item-title">
            {item.location.area[3]}, {item.location.area[1]}
          </h6>
        </div>
      ))}
    </div>
  );
}
