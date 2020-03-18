interface Payment {
  date: Date;
  amount: number;
}

interface Debt {
  startDate: Date;
  debt: number;
  interestsRate: number;
  operationalCosts: number;
  payments?: Payment[];
}

export class debt {
  startDate: Date;
  interestsRate: number;
  interestsRatePercentages: number;
  operationalCosts: number;
  debt: number;
  payments?: Payment[];

  constructor(data: Debt) {
    this.interestsRate = data.interestsRate / 100;
    this.interestsRatePercentages = data.interestsRate;
    this.startDate = data.startDate;
    this.operationalCosts = data.operationalCosts;
    this.debt = data.debt;
    this.payments = data.payments
      ? data.payments.sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        })
      : [];
    console.log(this.payments);
  }

  getInterests4DayExcludesPayments = (
    endDate: Date,
    startDate = this.startDate
  ) => {
    console.log(endDate, startDate);
    const startYear: number = this.startDate.getFullYear();
    const endYear: number = endDate.getFullYear();
    let interests: number = 0;

    if (startYear !== endYear) {
      interests = this.debt * (endYear - startYear) * this.interestsRate;
      startDate = new Date("01/01/" + endYear + "00:00:00");
    }

    const daysInYear: number = Math.ceil(
      (new Date("12/31/" + endYear + " 23:59:59").getTime() -
        new Date("01/01/" + startYear + " 00:00:00").getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const dayDif: number = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    interests =
      interests + this.debt * (dayDif / daysInYear) * this.interestsRate;
    return interests;
  };

  getDebt4Date = (date: Date) => {
    let debtStats: {
      date: Date;
      debt: number;
      interests: number;
      operationalCosts: number;
    } = {
      date: this.startDate,
      debt: this.debt,
      interests: 0,
      operationalCosts: this.operationalCosts
    };
    if (typeof this.payments === "undefined") {
      debtStats.interests = this.getInterests4DayExcludesPayments(date);
      debtStats.date = date;
    } else {
      for (let i = this.payments.length - 1; i >= 0; i--) {
        let payment = this.payments[i];
        debtStats.interests += this.getInterests4DayExcludesPayments(
          payment.date,
          debtStats.date
        );
        debtStats.date = payment.date;
        debtStats.operationalCosts -= payment.amount;
        if (debtStats.operationalCosts < 0) {
          debtStats.interests -= Math.abs(debtStats.operationalCosts);
          debtStats.operationalCosts = 0;
        }
        if (debtStats.interests < 0) {
          debtStats.debt -= Math.abs(debtStats.interests);
          this.debt = debtStats.debt;
          debtStats.interests = 0;
        }
      }
      debtStats.interests += this.getInterests4DayExcludesPayments(
        date,
        debtStats.date
      );
      debtStats.date = date;
    }
    return debtStats;
  };
}
