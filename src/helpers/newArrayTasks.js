export const newState = (tasks, item) => tasks.map((task) => {
    if (task.id === item.taskId) {
        const newhoursWastedPerDay = task.hoursWastedPerDay.map((el, idx) => {
            return item.idx === idx ? {
                ...el,
                singleHoursWasted: item.numValue
            } : el
        })
        return {
            ...task,
            hoursWastedPerDay: newhoursWastedPerDay
        }
    }
    return task
})

export const objToBackEnd = (tasks, item) => {
    const correctObj = tasks.find(task => task.id === item.taskId)

    const newStateArray = correctObj.hoursWastedPerDay.map((el, idx) => item.idx === idx ? {
        ...el,
        singleHoursWasted: item.value
    } : el)
    const newObj = {
        ...correctObj,
        hoursWastedPerDay: newStateArray
    };

    return newObj
}

// const test = tasks[item.indexArray].hoursWastedPerDay[item.idx]
// const obj = {
//   ...test,
//   singleHoursWasted: item.value
// }
// tasks[item.indexArray].hoursWastedPerDay.splice(item.idx, 1, obj)
// console.log(obj);
// console.log(tasks);