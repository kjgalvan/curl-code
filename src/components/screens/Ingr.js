import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';

export default function Ingr() {
  onClick = () => {
  
  }

  return (
<View style={styles.container}>
<Image source={{ uri: "https://www.okaypurenaturals.com/okay-hemp-seed-shea-softening-anti-breakage-shampoo-helps-stimulate-hair-growth-moisturize-hair-scalp-prevents-breakage-sulfate-silicone-paraben-free-for-all-hair-types-and-textures-made-in-usa-12oz-355ml/"}} 
style={{ width: 200, height: 200 }}/>
<Image source={{ uri: "https://www.okaypurenaturals.com/okay-hemp-seed-shea-softening-anti-breakage-shampoo-helps-stimulate-hair-growth-moisturize-hair-scalp-prevents-breakage-sulfate-silicone-paraben-free-for-all-hair-types-and-textures-made-in-usa-12oz-355ml/"}}
 style={{ width: 200, height: 200 }} PlaceholderContent={<ActivityIndicator />}/>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff0f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTop: {
    margin: 10,
  }
});