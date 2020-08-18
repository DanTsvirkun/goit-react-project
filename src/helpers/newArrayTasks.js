export const newState = (task, item) => {
    const newArray = [
        ...task.hoursWastedPerDay
    ]
    const newObj = {
        ...newArray[item.idx],
        singleHoursWasted: item.numValue
    }
    newArray.splice(item.idx, 1, newObj)
    const total = newArray.reduce((acc, el) => acc + el.singleHoursWasted, 0)
    return {
        ...task,
        hoursWastedPerDay: newArray,
        hoursWasted: total
    }
}