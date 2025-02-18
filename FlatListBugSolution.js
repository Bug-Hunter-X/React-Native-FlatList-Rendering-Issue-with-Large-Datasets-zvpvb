// FlatListBugSolution.js
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const DATA = Array.from({ length: 1000 }, (_, i) => ({ id: i, title: `Item ${i}` }));

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const FlatListOptimized = () => {
  const getItemLayout = useCallback((data, index) => ({
    length: 44,
    offset: 44 * index,
    index,
  }), []);

  const memoizedItem = useMemo(() => Item, []);

  const renderItem = useCallback(({ item }) => (
    <memoizedItem title={item.title} />
  ), [memoizedItem]);

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      getItemLayout={getItemLayout}  //This is the key change!
    />
  );
};

export default FlatListOptimized;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});