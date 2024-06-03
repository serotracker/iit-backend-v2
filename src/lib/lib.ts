import groupBy from 'lodash/groupBy.js';

export const isArrayOfUnknownType = (input: unknown): input is unknown[] => {
  return Array.isArray(input);
}

export const typedObjectKeys = <TKey extends string>(input: Record<TKey, unknown>): Array<TKey> => {
  return Object.keys(input) as TKey[];
}

export const typedGroupBy = <TKey extends string, TValue>(values: TValue[], groupingFunction: (value: TValue) => TKey): Record<TKey, TValue[]> => {
  return groupBy(values, groupingFunction) as Record<TKey, TValue[]>
}

export const typedObjectEntries = <TKey extends string, TValue>(input: Record<TKey, TValue>): [TKey, TValue][] => {
  return Object.entries(input) as [TKey, TValue][];
}

export const typedObjectFromEntries = <TKey extends string, TValue>(input: [TKey, TValue][]): Record<TKey, TValue> => {
  return Object.fromEntries(input) as Record<TKey, TValue>;
}

export const groupByArray = <TGroupingKey extends string, TGroupingValue extends string, TValue extends Record<TGroupingKey, TGroupingValue>>(values: TValue[], groupingKey: TGroupingKey): Array<Record<TGroupingKey, TGroupingValue> & {data: Omit<TValue, TGroupingKey>[]}> => {
  const valueToGroupingValue = (value: TValue): TGroupingValue => {
    return value[groupingKey]
  }

  const groupByWithRecords = typedGroupBy(values, valueToGroupingValue);
  return typedObjectKeys(groupByWithRecords).map((groupingValue) => {
    const groupingKeyAndValue = {
      [groupingKey]: groupingValue
    } as Record<TGroupingKey, TGroupingValue>

    const groupedData = groupByWithRecords[groupingValue]

    return {
      ...groupingKeyAndValue,
      data: groupedData.map((dataPoint) => {
        const {[groupingKey]: a, ...dataPointWithoutGroupingKey} = dataPoint;

        return dataPointWithoutGroupingKey;
      })
    }
  })
}