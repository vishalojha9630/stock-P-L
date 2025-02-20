import { Cls } from '@src/commonCSS/Colors'
import Fsize, { hp } from '@src/commonCSS/Fsize'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Holdings</Text>
      </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Cls.white,
  },
  header: {
    padding: hp(2.5),
    backgroundColor: Cls.bgc,
    borderTopRightRadius:hp(2),
    borderTopLeftRadius:hp(2)
  },
  headerText: {
    color: Cls.white,
    fontWeight: "bold",
    fontSize: Fsize.fs22,
  },
})