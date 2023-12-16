import moment, { Moment } from "moment";

export function AdjustGMTInStartDateAndHandleNull(date : moment.Moment | null | undefined): Date
{
    if(!date) return new Date(2000, 0, 1);
    const utcOffset = date.utcOffset();
    const finalDate = date.set("hours", 0).set("minutes", 0).set("seconds", 0).set("milliseconds", 0);
    if(utcOffset > 0)
    {
        return finalDate.add(utcOffset, "minutes").toDate();
    }
    else if(utcOffset < 0)
    {
        return finalDate.subtract(utcOffset, "minutes").toDate();
    }
    return finalDate.toDate();
}

export function AdjustGMTInEndDateAndHandleNull(date : moment.Moment | null | undefined): Date
{
    if(!date) 
    {
        const currentDate = moment().set("hours", 23).set("minutes", 59).set("seconds", 59).set("milliseconds", 999);
        if(currentDate.utcOffset() > 0)
        {
            return currentDate.add(currentDate.utcOffset(), "minutes").toDate();
        }
        else if(currentDate.utcOffset() < 0)
        {
            return currentDate.subtract(currentDate.utcOffset(), "minutes").toDate();
        }
        return currentDate.toDate();
    }

    const utcOffset = date.utcOffset();
    const finalDate = date.set("hours", 23).set("minutes", 59).set("seconds", 59).set("milliseconds", 999);
    if(utcOffset > 0)
    {
        return finalDate.add(utcOffset, "minutes").toDate();
    }
    else if(utcOffset < 0)
    {
        return finalDate.subtract(utcOffset, "minutes").toDate();
    }
    return finalDate.toDate();
}

export function AdjustGMTInEndDateAndHandleNullReturnMoment(date: moment.Moment | null | undefined): moment.Moment
{
    if(!date) 
    {
        const currentDate = moment().set("hours", 23).set("minutes", 59).set("seconds", 59).set("milliseconds", 999);
        if(currentDate.utcOffset() > 0)
        {
            return currentDate.add(currentDate.utcOffset(), "minutes");
        }
        else if(currentDate.utcOffset() < 0)
        {
            return currentDate.subtract(currentDate.utcOffset(), "minutes");
        }
        return currentDate;
    }

    const utcOffset = date.utcOffset();
    const finalDate = date.set("hours", 23).set("minutes", 59).set("seconds", 59).set("milliseconds", 999);
    if(utcOffset > 0)
    {
        return finalDate.add(utcOffset, "minutes");
    }
    else if(utcOffset < 0)
    {
        return finalDate.subtract(utcOffset, "minutes");
    }
    return finalDate;
}

export function AdjustCustomUTC(date: moment.Moment | null | undefined, utcOffset: number): moment.Moment
{
    if(date)
    {
        if(utcOffset >= 0)
        {
            return date.add(utcOffset, "minutes");
        }
        else
        {
            return date.subtract(utcOffset, "minutes");
        }
    }

    return moment();
}

export function AdjustGMTInStartDateAndHandleNullReturnMoment(date : moment.Moment | null | undefined): moment.Moment
{
    if(!date) return moment();
    const utcOffset = date.utcOffset();
    const finalDate = date.set("hours", 0).set("minutes", 0).set("seconds", 0).set("milliseconds", 0);
    if(utcOffset > 0)
    {
        return finalDate.add(utcOffset, "minutes");
    }
    else if(utcOffset < 0)
    {
        return finalDate.subtract(utcOffset, "minutes");
    }
    return finalDate;
}

export const dateFormatterForQualityAndProfile = (date : Moment | Date) => {
    return moment(date).format("DD/MM/YYYY h:mma")
}