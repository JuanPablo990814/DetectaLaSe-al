export type Category = "Señal de alerta" | "Mito" | "Prevención";

export interface Question {
  id: string;
  text: string;
  correctAnswer: Category;
  feedback: string;
}

export const questions: Question[] = [
  {
    id: "q1",
    text: "Sientes un bulto en el seno o la axila",
    correctAnswer: "Señal de alerta",
    feedback: "¡Correcto! Cualquier bulto nuevo o inusual debe ser evaluado por un profesional médico. No entres en pánico, pero sí consúltalo."
  },
  {
    id: "q2",
    text: "Usar brasier de varillas causa cáncer de mama",
    correctAnswer: "Mito",
    feedback: "¡Así es! No hay evidencia científica que respalde que el tipo de ropa interior causa cáncer."
  },
  {
    id: "q3",
    text: "Realizarse autoexámenes mamarios periódicamente",
    correctAnswer: "Prevención",
    feedback: "¡Muy bien! Conocer tu cuerpo y revisarte ayuda a detectar cualquier cambio a tiempo."
  },
  {
    id: "q4",
    text: "Pérdida de líquido o sangrado por el pezón no asociado a la lactancia",
    correctAnswer: "Señal de alerta",
    feedback: "Correcto. Una secreción espontánea y anormal es un síntoma que requiere atención médica."
  },
  {
    id: "q5",
    text: "Los desodorantes o antitranspirantes provocan cáncer",
    correctAnswer: "Mito",
    feedback: "Exacto. Se han realizado múltiples estudios y ninguno ha encontrado relación entre usar desodorante y el desarrollo de cáncer."
  },
  {
    id: "q6",
    text: "Mantener un peso saludable y realizar actividad física",
    correctAnswer: "Prevención",
    feedback: "¡Excelente! Los estudios demuestran que un estilo de vida activo y saludable reduce significativamente el riesgo de aparición de cáncer."
  },
  {
    id: "q7",
    text: "El cáncer de mama es contagioso",
    correctAnswer: "Mito",
    feedback: "¡Correcto! El cáncer es el resultado del crecimiento celular descontrolado en el cuerpo y NO se puede contagiar a otras personas."
  },
  {
    id: "q8",
    text: "Piel con apariencia de 'cáscara de naranja' o enrojecimiento",
    correctAnswer: "Señal de alerta",
    feedback: "Muy bien. Cambios en la textura de la piel del seno (hundimientos o piel de naranja) son un aviso clave para ir al médico."
  },
  {
    id: "q9",
    text: "Consumir alcohol frecuentemente y fumar incrementa el riesgo",
    correctAnswer: "Prevención",
    feedback: "Es correcto entenderlo (evitarlo es la prevención). Limitar o evitar el consumo de tabaco y alcohol reduce tus riesgos."
  },
  {
    id: "q10",
    text: "Los hombres no tienen riesgo de tener cáncer de mama",
    correctAnswer: "Mito",
    feedback: "Así es, es un mito. Aunque es mucho menos frecuente, los hombres también tienen tejido mamario y pueden desarrollarlo."
  }
];
