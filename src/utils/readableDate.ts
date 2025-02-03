export function readableDate(date: string, weekday: string, type: "hijri" | "gregorian") {

    const gregorianMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"];
    const hijriMonths = ["محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];


    const a = date.split("-").map(s => +s)

    const day = a[0]
    const month = type == "gregorian" ? gregorianMonths[a[1] - 1] : hijriMonths[a[1] - 1]
    const year = a[2]

    return `${type == "gregorian" ? weekday + " " : ""}${day} ${month} ${year}`
}