function HabitCalendar({ completedDates = [] }) {
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    last7Days.push(new Date(date));
  }

  const isCompleted = (date) => {
    return completedDates.some((completedDate) => {
      const d1 = new Date(completedDate);
      return d1.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-bold text-slate-700">Weekly Progress</h4>

        <span className="rounded-xl bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
          Last 7 Days
        </span>
      </div>

      <div className="flex items-center gap-3">
        {last7Days.map((date, index) => {
          const completed = isCompleted(date);

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs font-semibold text-slate-400">
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>

              <div
                className={`h-12 w-12 rounded-2xl transition-all duration-300 hover:scale-110 ${
                  completed
                    ? "bg-gradient-to-br from-violet-500 to-pink-400 shadow-lg shadow-purple-200"
                    : "bg-slate-100"
                }`}
              >
                <div className="flex h-full items-center justify-center text-lg">
                  {completed ? "✓" : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitCalendar;