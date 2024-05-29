import { database } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import { addCategory, emptyCategory } from "../state/category";
export const fetchCategoryData = async (dispatch, uid) => {
  dispatch(emptyCategory({}));
  const categoriesSnapshot = await get(
    ref(database, `users/${uid}/categories`)
  );
  if (categoriesSnapshot.exists()) {
    const categories = categoriesSnapshot.val();
    Object.entries(categories).forEach(([key, category]) => {
      dispatch(
        addCategory({
          title: category.title,
          icon: category.icon,
          expenditure: category.expenditure,
          id: key,
        })
      );
    });
  } else {
    console.log("No categories found for user:", uid);
  }
};
