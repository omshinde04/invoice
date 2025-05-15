import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/triot_solutions_logo.jpg'; // Ensure this path is correct

const primaryColor = '#0056b3'; // A strong blue
const textColor = '#333333';
const lightGray = '#f8f8f8';
const borderGray = '#cccccc';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 30,
    marginBottom: 3,
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  companyInfo: {
    alignItems: 'flex-start',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 3,
  },
  companyAddress: {
    fontSize: 9,
    color: textColor,
    marginBottom: 1,
  },
  invoiceDetails: {
    alignItems: 'flex-end',
  },
  invoiceNumber: {
    fontSize: 11,
    color: textColor,
    marginBottom: 1,
  },
  invoiceDate: {
    fontSize: 9,
    color: textColor,
  },
  billToContainer: {
    marginBottom: 20,
  },
  billToTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textColor,
    marginBottom: 5,
  },
  billToText: {
    fontSize: 9,
    color: textColor,
    marginBottom: 1,
  },
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    marginBottom: 15,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: lightGray,
    borderBottomWidth: 1,
    borderColor: borderGray,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: borderGray,
  },
  tableColHeader: {
    padding: 8,
    fontWeight: 'bold',
    fontSize: 9,
    color: textColor,
    textAlign: 'left',
  },
  tableCol: {
    padding: 8,
    fontSize: 9,
    color: textColor,
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  summaryContainer: {
    alignItems: 'flex-end',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  summaryLabel: {
    width: 80,
    fontSize: 9,
    color: textColor,
    textAlign: 'right',
    marginRight: 5,
  },
  summaryValue: {
    width: 80,
    fontSize: 9,
    color: textColor,
    textAlign: 'right',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  grandTotalLabel: {
    width: 80,
    fontWeight: 'bold',
    fontSize: 11,
    color: primaryColor,
    textAlign: 'right',
    marginRight: 5,
  },
  grandTotalValue: {
    width: 80,
    fontWeight: 'bold',
    fontSize: 11,
    color: primaryColor,
    textAlign: 'right',
  },
  bankDetailsContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: borderGray,
    paddingTop: 15,
  },
  bankDetailsTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: textColor,
    marginBottom: 5,
  },
  bankDetailsText: {
    fontSize: 9,
    color: textColor,
    marginBottom: 1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderColor: borderGray,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: textColor,
    textAlign: 'left',
  },
  termsAndConditionsContainer: {
    marginTop: 20,
  },
  termsAndConditionsTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: textColor,
    marginBottom: 3,
  },
  termsAndConditionsText: {
    fontSize: 8,
    color: textColor,
    marginBottom: 2,
  },
});

const InvoicePdfDocument = ({ state }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={state?.company?.logoUrl || logo} />
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{state?.company?.name || 'Your Company Name'}</Text>
          <Text style={styles.companyAddress}>{state?.company?.address || 'Your Company Address'}</Text>
          <Text style={styles.companyAddress}>Mobile: {state?.company?.mobile_no || 'N/A'}</Text>
          <Text style={styles.companyAddress}>Email: {state?.company?.email || 'N/A'}</Text>
          {state?.company?.gstin && <Text style={styles.companyAddress}>GSTIN: {state.company.gstin}</Text>}
        </View>
        <View style={styles.invoiceDetails}>
          <Text style={styles.invoiceNumber}>Invoice #: {state?.customer?.invoiceNo || 'N/A'}</Text>
          <Text style={styles.invoiceDate}>Date: {state?.customer?.date || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.billToContainer}>
        <Text style={styles.billToTitle}>Bill To</Text>
        <Text style={styles.billToText}>Name: {state?.customer?.name || 'N/A'}</Text>
        <Text style={styles.billToText}>Address: {state?.customer?.address || 'N/A'}</Text>
        <Text style={styles.billToText}>Mobile: {state?.customer?.mobileNo || 'N/A'}</Text>
        <Text style={styles.billToText}>Email: {state?.customer?.email || 'N/A'}</Text>
        {state?.customer?.gstin && <Text style={styles.billToText}>GSTIN: {state.customer.gstin}</Text>}
        <Text style={styles.billToText}>Place of Supply: {state?.customer?.placeOfSupply || 'N/A'}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableColHeader, { width: '8%' }]}>Sr. No.</Text>
          <Text style={[styles.tableColHeader, { width: '20%' }]}>Item</Text>
          <Text style={[styles.tableColHeader, { width: '12%' }]}>HSN/SAC</Text>
          <Text style={[styles.tableColHeader, { width: '8%', textAlign: 'right' }]}>Unit</Text>
          <Text style={[styles.tableColHeader, { width: '8%', textAlign: 'right' }]}>Rate</Text>
          <Text style={[styles.tableColHeader, { width: '6%', textAlign: 'right' }]}>Qty</Text>
          <Text style={[styles.tableColHeader, { width: '8%', textAlign: 'right' }]}>CGST</Text>
          <Text style={[styles.tableColHeader, { width: '8%', textAlign: 'right' }]}>SGST</Text>
          <Text style={[styles.tableColHeader, { width: '8%', textAlign: 'right' }]}>IGST</Text>
          <Text style={[styles.tableColHeader, { width: '14%', textAlign: 'right' }]}>Total (Incl. Tax)</Text>
        </View>
        {state?.items?.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCol, { width: '8%' }]}>{index + 1}</Text>
            <Text style={[styles.tableCol, { width: '20%' }]}>{item?.description || 'N/A'}</Text>
            <Text style={[styles.tableCol, { width: '12%' }]}>{item?.hsnSacCode || 'N/A'}</Text>
            <Text style={[styles.tableCol, { width: '8%', textAlign: 'right' }]}>{item?.unit || 'N/A'}</Text>
            <Text style={[styles.tableCol, { width: '8%', textAlign: 'right' }]}>₹{parseFloat(item?.rate || 0).toFixed(2)}</Text>
            <Text style={[styles.tableCol, { width: '6%', textAlign: 'right' }]}>{item?.quantity || 'N/A'}</Text>
            <Text style={[styles.tableCol, { width: '8%', textAlign: 'right' }]}>₹{parseFloat(item?.cgstAmount || 0).toFixed(2)}</Text>
            <Text style={[styles.tableCol, { width: '8%', textAlign: 'right' }]}>₹{parseFloat(item?.sgstAmount || 0).toFixed(2)}</Text>
            <Text style={[styles.tableCol, { width: '8%', textAlign: 'right' }]}>₹{parseFloat(item?.igstAmount || 0).toFixed(2)}</Text>
            <Text style={[styles.tableCol, { width: '14%', textAlign: 'right' }]}>₹{parseFloat(item?.totalAmountIncludingTax || 0).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>₹{parseFloat(state?.totalAmount?.subtotal || 0).toFixed(2)}</Text>
        </View>
        {parseFloat(state?.taxSummary?.cgstAmount || 0) > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total CGST:</Text>
            <Text style={styles.summaryValue}>₹{parseFloat(state.taxSummary.cgstAmount || 0).toFixed(2)}</Text>
          </View>
        )}
        {parseFloat(state?.taxSummary?.sgstAmount || 0) > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total SGST:</Text>
            <Text style={styles.summaryValue}>₹{parseFloat(state.taxSummary.sgstAmount || 0).toFixed(2)}</Text>
          </View>
        )}
        {parseFloat(state?.taxSummary?.igstAmount || 0) > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total IGST:</Text>
            <Text style={styles.summaryValue}>₹{parseFloat(state.taxSummary.igstAmount || 0).toFixed(2)}</Text>
          </View>
        )}
        <View style={styles.grandTotalRow}>
          <Text style={styles.grandTotalLabel}>Grand Total:</Text>
          <Text style={styles.grandTotalValue}>₹{parseFloat(state?.totalAmount?.grandTotal || 0).toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.bankDetailsContainer}>
        <Text style={styles.bankDetailsTitle}>Bank Details</Text>
        <Text style={styles.bankDetailsText}>Account Name: {state?.company?.bankAccountName || 'N/A'}</Text>
        <Text style={styles.bankDetailsText}>Bank: {state?.company?.bankName || 'N/A'}</Text>
        <Text style={styles.bankDetailsText}>Account No.: {state?.company?.bankAccountNumber || 'N/A'}</Text>
        <Text style={styles.bankDetailsText}>IFSC: {state?.company?.ifscCode || 'N/A'}</Text>
        <Text style={styles.bankDetailsText}>Branch: {state?.company?.branchName || 'N/A'}</Text>
      </View>

      {/* Optional: Add Terms and Conditions */}
      {state?.company?.termsAndConditions && (
        <View style={styles.termsAndConditionsContainer}>
          <Text style={styles.termsAndConditionsTitle}>Terms and Conditions</Text>
          <Text style={styles.termsAndConditionsText}>{state.company.termsAndConditions}</Text>
        </View>
      )}

      {/* Footer with Page Number and Company Info */}
      <View style={styles.footerContainer} fixed>
        <Text style={styles.footerText}>{state?.company?.website || 'Your Website'}</Text>
        <Text style={styles.footerText}>Page 1 of 1</Text> {/* Basic page numbering */}
      </View>
    </Page>
  </Document>
);

export default InvoicePdfDocument;