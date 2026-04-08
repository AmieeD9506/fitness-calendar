export const dateUtils = {
  // 格式化日期为 YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 检查是否为今天
  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  },

  // 检查是否为2026年
  is2026(date: Date): boolean {
    return date.getFullYear() === 2026;
  },

  // 获取2026年1月1日
  get2026StartDate(): Date {
    return new Date('2026-01-01');
  },

  // 获取2026年12月31日
  get2026EndDate(): Date {
    return new Date('2026-12-31');
  },

  // 将日期字符串转为Date对象
  parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }
};
