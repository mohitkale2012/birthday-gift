function formatMemoryDate(memory) {
  const candidate = memory?.date || memory?.createdAt || memory?.updatedAt;
  if (!candidate) return "";

  const d = new Date(candidate);
  if (Number.isNaN(d.getTime())) return "";

  // Special label for a specific moment (uploaded via Atlas)
  // 2022-01-01 => "January 2022, Amravati"
  if (
    memory?._id === "6943f19e8291f851fd1f81da" &&
    d.getFullYear() === 2022 &&
    d.getMonth() === 0
  ) {
    return "January 2022, Amravati";
  }

  // Special label override
  if (memory?._id === "6943f8b88291f851fd1f81de") {
    return "Summer of 2022";
  }

  // Special label override
  if (memory?._id === "6943fff98291f851fd1f81e2") {
    return "2025, Ahmedabad";
  }

  // Special label override
  if (memory?._id === "694401c78291f851fd1f81e4") {
    return "11:11 forever";
  }

  // If you don't know the exact date, use Jan 1 of that year as a "year-only" marker.
  // Example: 2016-01-01 => "Tour of 2016"
  if (d.getMonth() === 0 && d.getDate() === 1) {
    return `Tour of ${d.getFullYear()}`;
  }

  // Special label for the March 2020 lockdown period
  if (d.getFullYear() === 2020 && d.getMonth() === 2) {
    return "March 2020, Lockdown";
  }

  // Example: 14 February 2023
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MemoryCard({ memory }) {
  const safeMemory = memory || {};

  const title =
    typeof safeMemory.title === "string" ? safeMemory.title.trim() : "";
  const description =
    typeof safeMemory.description === "string"
      ? safeMemory.description.trim()
      : "";
  const dateLabel = formatMemoryDate(safeMemory);

  return (
    <article className="memory-card">
      <header className="memory-card__header">
        <h3 className="memory-card__title">{title || "Untitled memory"}</h3>
        {dateLabel ? <p className="memory-card__date">{dateLabel}</p> : null}
      </header>

      {description ? (
        <p className="memory-card__description">{description}</p>
      ) : null}
    </article>
  );
}


