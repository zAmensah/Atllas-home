import { FC } from "react";
import { IReview } from "../../types/Review";

import "./Review.css";

const Review: FC<{ review: IReview }> = ({ review }) => {
  return (
    <div className="mb-5">
      <div className="item-header">{review.name}</div>
      <div className="item-post">
        <p>{review.comment}</p>
      </div>
      <hr />
    </div>
  );
};

export default Review;
