import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import logo from "../../Images/ICFDR.png";

// Font.register({
//   family: 'AntonFamily',
//   src: MyCustomFont
// })

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  logo: {
    width: 100,
    height: 100, // Adjust height as needed
  },
  details: {
    marginBottom: 20,
  },
  heading: {
    fontWeight: 700,
    fontSize: 20,
    textDecoration: "underline",
    marginBottom: "5px"
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: '700',
    fontSize: "20px"
  },
  detail: {
    fontSize: "16px"
  },
  donationDetails: {
    marginTop: 20,
    border: '1px solid #ddd',
    padding: 10,
  },
  donationDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

const Receipt = ({ data }) => {
  const pageColors = ['#f6d186', '#f67280', '#c06c84'];


  return (
      <Document style={{height:"100%"}}>
        {/* <Page style={{...styles.body, backgroundColor: pageColors[0]}}>
          <View>
          <Text style={styles.header} fixed>ICFDR Donation Receipt</Text>
          <Image src={logo} />
          </View>
          <Text style={styles.text}>
          Name: {data.name}
          </Text>
          <Text style={styles.text}>
          Address: {data.address}
          </Text>
          <Text style={styles.text}>
          Amount: {data.donation}
          </Text>
          <Text style={styles.text}>
          Date: {data.date}
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </Page> */}
        <Page style={styles.page} size={"A4"}>
          <View style={styles.header}>
            <Text style={styles.title}>ICFDR Donation Receipt</Text>
            <Image style={styles.logo} src={logo} />
          </View>

          <View style={styles.details}>
            <Text>Date: {data?.date}</Text>
            <Text>Receipt Number: {data?.permReceiptNumber}</Text> (This replaces the temporary number)
          </View>

          <View style={styles.details}>
            <Text style={styles.heading}>Donor Information:</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detail}>{data?.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Address:</Text>
              <Text style={styles.detail}>{data?.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Member ID:</Text>
              <Text style={styles.detail}>{data?.memberID}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Donor Type:</Text>
              <Text style={styles.detail}>{data?.donorType}</Text>
            </View>
          </View>

          <View style={styles.donationDetails}>
            <Text style={styles.heading}>Donation Details:</Text>
            <View style={styles.donationDetailRow}>
              <Text style={styles.detailLabel}>Purpose:</Text>
              <Text style={styles.detail}>{data?.purpose}</Text>
            </View>
            <View style={styles.donationDetailRow}>
              <Text style={styles.detailLabel}>Amount:</Text>
              <Text style={styles.detail}>{data?.donation?.toFixed(2)} INR</Text>  {/* Format donation amount */}
            </View>
            <View style={styles.donationDetailRow}>
              <Text style={styles.detailLabel}>Payment Mode:</Text>
              <Text style={styles.detail}>{data?.paymentMode}</Text>
            </View>
            <View style={styles.donationDetailRow}>
              <Text style={styles.detailLabel}>Transaction Number:</Text>
              <Text style={styles.detail}>{data?.transactionNumber}</Text>
            </View>
            <View style={styles.donationDetailRow}>
              <Text style={styles.detailLabel}>Bank Name:</Text>
              <Text style={styles.detail}>{data?.bankName}</Text>
            </View>
          </View>

          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Thank you for your generous donation!
          </Text>
        </Page>

      </Document>
  );
};

export default Receipt;