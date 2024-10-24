import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';

const QuantityInputModal = ({ visible, onClose, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleAdd = () => {
    if (quantity > 0) {
      onAdd(quantity);
      onClose();
    } else {
      alert('Please enter a valid quantity.');
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
          <Text style={{color:'black'}}>Enter Quantity:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TouchableOpacity onPress={decrementQuantity} style={{ padding: 10 }}>
              <Text style={{ fontSize: 20, color: 'black' }}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginHorizontal: 10, width: 50, textAlign: 'center', color: 'black' }}
              keyboardType="numeric"
              value={String(quantity)} // Convert quantity to string for TextInput
              onChangeText={(text) => setQuantity(Math.max(0, parseInt(text, 10) || 0))} // Ensure it's a valid number or 0
            />
            <TouchableOpacity onPress={incrementQuantity} style={{ padding: 10 }}>
              <Text style={{ fontSize: 20, color: 'black' }}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}> 
            <Button title="Cancel" onPress={onClose} color="red" />
            <Button title="Add to Cart" onPress={handleAdd} color={COLORS.primary}/>
          </View>
         
        </View>
      </View>
    </Modal>
  );
};

export default QuantityInputModal;
