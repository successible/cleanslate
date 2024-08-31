import React from 'react'
import Exercise from '../../../assets/common/fastexercise.svg'
import { deleteExerciseLogOnCloud } from '../../../helpers/exercise-log/deleteExerciseLogOnCloud'
import { ExerciseLog } from '../../../models/exerciseLog'
import { Item } from '../../item/Item'

export const ExerciseLogItem: React.FC<{ exercise_log: ExerciseLog }> = (
  props
) => {
  const { exercise_log } = props
  const { amount, category, createdAt, groupName, id, name } = exercise_log

  const onUpdate = () => {}

  const onDelete = () => {
    deleteExerciseLogOnCloud(id, () => {})
  }

  const src = Exercise.src
  
  return (
    <Item
      item={{
        alias: null,
        amount,
        barcode: null,
        basicFood: null,
        calories: null,
        category: category,
        childRecipe: null,
        consumed: null,
        createdAt,
        data: exercise_log,
        food: null,
        group: groupName,
        id,
        meal: null,
        name:
          name !== ''
            ? `Custom (${name})`
            : category && ['Other', 'Swimming', 'Lifting'].includes(groupName)
              ? `${groupName} (${category})`
              : `${groupName}`,
        onDelete,
        onUpdate: onUpdate,
        profile: null,
        protein: null,
        recipe: null,
        src,
        type: 'exercise-log',
        unit: null,
      }}
    />
  )
}
