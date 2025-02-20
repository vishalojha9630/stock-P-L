import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { Cls } from '@src/commonCSS/Colors';
import Fsize, { hp } from '@src/commonCSS/Fsize';
import Header from '@src/components/header'
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import Loader from '@src/components/loader';
import Img from '@src/assets';


const Home = () => {
  const [fetchData, setFetchData] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://json-jvjm.onrender.com/test");
      if (!response.ok) {
        throw new Error(`Network Error: ${response.status}`);
      }
      const jsonData = await response.json();
      return setFetchData(jsonData);
    } catch (error) {
      console.error("API Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      handleAPI();
    }
  }, [isFocused]);

  const { totalCurrentValue, totalInvestment, totalPL, todaysPL } = useMemo(() => {
    if (!fetchData?.userHolding) return { totalCurrentValue: 0, totalInvestment: 0, totalPL: 0, todaysPL: 0 };
    let currentValue = 0;
    let investment = 0;
    let profitLoss = 0;
    let todayPL = 0;

    fetchData?.userHolding?.forEach((item: any) => {
      currentValue += item?.ltp * item?.quantity;
      investment += item?.avgPrice * item?.quantity;
      profitLoss += (item?.ltp * item?.quantity) - (item?.avgPrice * item?.quantity);
      todayPL += (item?.ltp - item?.close) * item?.quantity;
    });

    return {
      totalCurrentValue: currentValue.toFixed(2),
      totalInvestment: investment.toFixed(2),
      totalPL: profitLoss.toFixed(2),
      todaysPL: todayPL.toFixed(2),
    };
  }, [fetchData]);

  const renderItem = ({ item }: any) => (
    <>
      <View style={styles.card}>
        <View style={styles.holdingRow}>
          <View>
            <Text style={styles.holdingTitle}>{item.symbol}</Text>
            <Text style={styles.company}>{item.symbol}</Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.price}>{item.ltp}</Text>
            <Text style={styles.quantity}>Qty: {item.quantity}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.totalValue}>Total Value: {(item?.quantity * item?.ltp).toFixed(2)}</Text>
          <Text style={[styles.change, { color: item?.ltp >= item?.close ? Cls.green : Cls.red }]}>
            <Image source={item?.ltp >= item?.close ? Img.UpArrow : Img.DownArrow} style={{ width: 16, height: 16 }} />
            {Math.abs((item?.ltp - item?.close)).toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={{ width: '100%', borderTopWidth: 0.7, borderColor: 'rgba(74, 74, 74, 0.2)' }} />
    </>
  );

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        data={fetchData?.userHolding}
        keyExtractor={(item) => item?.symbol}
        renderItem={renderItem}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["30%", "30%"]}
        enablePanDownToClose={true}
        animateOnMount={true}
        style={{ width: '100%' }}
      >
        <BottomSheetView>
          <View style={styles.bottomSheetcontainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Current Value:</Text>
              <Text style={styles.value}>₹{totalCurrentValue}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Total Investment:</Text>
              <Text style={styles.value}>₹{totalInvestment}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Today's P&L:</Text>
              <Text style={[styles.value, todaysPL < 0 ? styles.loss : styles.profit]}>
                ₹{todaysPL}
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>

      <TouchableOpacity onPress={openBottomSheet} style={styles.totalPL}>
        <Text style={styles.totalPLText}>Total P&L: ₹{totalPL}</Text>
      </TouchableOpacity>

      {loading &&
        <Loader loading={loading} />
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cls.white,
  },

  card: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: Cls.white,
  },
  holdingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  holdingTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  company: {
    color: "gray",
    fontWeight: '400'
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  price: {
    fontWeight: "bold",
    fontSize: Fsize.fs19,
  },
  quantity: {
    color: "gray",
  },
  bottomRow: {
    marginTop: hp(1.5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: Fsize.fs16,
  },
  change: {
    fontWeight: "bold",
    fontSize: Fsize.fs16,
  },
  totalPL: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 16,
    backgroundColor: Cls.totalBg,
  },
  totalPLText: {
    textAlign: "center",
    fontSize: Fsize.fs19,
    fontWeight: "bold",
    color: Cls.green,
  },


  bottomSheetcontainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profit: {
    color: "green",
  },
  loss: {
    color: "red",
  },
  totalPLContainer: {
    backgroundColor: "#E7F9ED",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },

})