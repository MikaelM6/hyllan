function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("sv-SE");
}

function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return <p>Inga recensioner ännu.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review, index) => (
        <li key={`${review.reviewerEmail ?? review.reviewerName}-${index}`} className={styles.review}>
          <div className={styles.header}>
            <strong>{review.reviewerName}</strong>
            <span aria-label={`Betyg ${review.rating} av 5`}>
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </span>
            <time dateTime={review.date}>{formatDate(review.date)}</time>
          </div>
          <p>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;