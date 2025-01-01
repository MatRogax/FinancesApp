export class Utils {

    static formatDatetime(datetime: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const formattedDate = new Date(datetime).toLocaleString('pt-BR', options);
        return formattedDate.replace(',', '');
    }


    static formatDateForSaving(date: string): string {
        const [day, month, year, hour, minute, second] = date.split(/\/| |:/);
        return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`).toISOString();
    }
}
