/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import axios from 'axios';

const App = () => {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<any>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getTotal = (p: number) => {
    axios
      .get(
        `https://api.github.com/search/code?q=addClass+user:mozilla&per_page=50&page=${p}`,
      )
      .then(res => {
        const resData = [...items, ...res.data.items];
        setItems(resData);
      });
  };

  const onScrollEnd = () => {
    if (totalCount !== items.length) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setTotalCount(items.length);
    getTotal(page);
  }, [page]);

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View>
          <Text>Total Items {items.length}</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={() => onScrollEnd()}
          data={items}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    paddingVertical: 5,
  },
});

export default App;
