import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId')
  const selectedProduct = useSelector( state => state.products.avaliableProducts.find(prod => prod.id === productId))
  const dispatch = useDispatch()

  return (
    <ScrollView style={styles.scroll}>
      <Image style={styles.image} source={ { uri: selectedProduct.imageUrl} } />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={ () => {
          dispatch(cartActions.addToCart(selectedProduct));
        } } />
      </View>
      <Text style={styles.price}>${ selectedProduct.price.toFixed(2) }</Text>
      <Text style={styles.description}>{ selectedProduct.description }</Text>
      <Text style={styles.description}>{ selectedProduct.description }</Text>
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 20
  },
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 20
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center'
  },
});

export default ProductDetailScreen