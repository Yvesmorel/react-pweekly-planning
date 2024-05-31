import moment from "moment";
function getWeekNumber(date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(date.getFullYear(), 0, 1).getTime();
    const weekNumber = Math.ceil(((date.getTime() - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
}
function calculerEcartSemaine(dateSelectionnee) {
    // Récupérer la date actuelle
    const dateActuelle = new Date();
    // Extraire l'année et le numéro de la semaine de la date actuelle
    const anneeActuelle = dateActuelle.getFullYear();
    const numeroSemaineActuelle = getWeekNumber(dateActuelle);
    // Extraire l'année et le numéro de la semaine de la date sélectionnée
    const anneeSelectionnee = dateSelectionnee.getFullYear();
    const numeroSemaineSelectionnee = getWeekNumber(dateSelectionnee);
    // Calculer le nombre de semaines depuis une date d'origine arbitraire
    // Calculer l'écart entre les semaines en utilisant la formule
    const ecartSemaine = semainesDepuisOrigine(anneeSelectionnee, numeroSemaineSelectionnee) -
        semainesDepuisOrigine(anneeActuelle, numeroSemaineActuelle);
    return ecartSemaine * 7;
}
function semainesDepuisOrigine(annee, numeroSemaine) {
    // Choisir le 1er janvier 2022 comme date d'origine
    const dateOrigine = new Date(2022, 0, 1);
    const anneeOrigine = dateOrigine.getFullYear();
    const numeroSemaineOrigine = getWeekNumber(dateOrigine);
    // Calculer le nombre total de semaines écoulées depuis la date d'origine
    let nombreSemaines = 0;
    for (let i = anneeOrigine; i < annee; i++) {
        nombreSemaines += moment().year(i).weeksInYear();
    }
    nombreSemaines += numeroSemaine - numeroSemaineOrigine;
    return nombreSemaines;
}
const makeCalcul = (date) => calculerEcartSemaine(date);
describe("Ecartweek", () => {
    test("current week to next week to be 7", () => {
        const currentDay = Date.now();
        const nextWeekDay = currentDay - 14 * 86400000;
        // console.log(calculerEcartSemaine(new Date(nextWeekDay)));
        const nextWeek = new Date(nextWeekDay);
        expect(makeCalcul(nextWeek)).toBe(-14);
    });
});
