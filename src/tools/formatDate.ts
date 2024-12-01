type Days = 1 | 2 | 3 | 4 | 5 | 6 | 7

const weekdaysLong = {
    [1]: "domingo",
    [2]: "segunda-feira",
    [3]: "terça-feira",
    [4]: "quarta-feira",
    [5]: "quinta-feira",
    [6]: "sexta-feira",
    [7]: "sábado",
}

export const formatDate = (date: Date, mode: "date-only" | "date-hours" = "date-hours") => {
    const now = new Date()
    const weekDay = (date.getDay() + 1) as Days
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 3600 * 24)

    if (date.toDateString() === now.toDateString()) {
        return mode === "date-only" ? "Hoje" : date.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })
    } else if (diffInDays <= 1) {
        return "Ontem"
    } else if (diffInDays < 7 && now.getDay() >= date.getDay()) {
        return weekdaysLong[weekDay]
    } else {
        return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
    }
}
