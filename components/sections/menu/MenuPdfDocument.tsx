import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { businessInfo } from "@/lib/business-info";
import { menuCategories, menuItems } from "@/lib/menu-data";

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const styles = StyleSheet.create({
  page: { paddingVertical: 48, paddingHorizontal: 56, fontSize: 10, color: "#1c1b1b" },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#d2c4bc",
  },
  brand: { fontSize: 22, fontWeight: 700, color: "#120702" },
  tagline: { fontSize: 10, color: "#4e453f", marginTop: 4 },
  categoryTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#120702",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomStyle: "solid",
    borderBottomColor: "#d2c4bc",
  },
  itemInfo: { flex: 1, paddingRight: 16 },
  itemName: { fontSize: 11, fontWeight: 700, color: "#120702" },
  itemDescription: { fontSize: 9, color: "#4e453f", fontStyle: "italic", marginTop: 2 },
  itemPrice: { fontSize: 11, fontWeight: 700, color: "#6b5c4c" },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "#d2c4bc",
    fontSize: 9,
    color: "#4e453f",
  },
  footerLine: { marginBottom: 2 },
});

export function MenuPdfDocument() {
  return (
    <Document title={`Menú — ${businessInfo.name}`} author={businessInfo.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>{businessInfo.name}</Text>
          <Text style={styles.tagline}>{businessInfo.description}</Text>
        </View>

        {menuCategories.map((category) => {
          const items = menuItems.filter((item) => item.category === category.id);
          if (!items.length) return null;

          return (
            <View key={category.id} wrap={false}>
              <Text style={styles.categoryTitle}>{category.label}</Text>
              {items.map((item) => (
                <View key={item.id} style={styles.row}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                  <Text style={styles.itemPrice}>{priceFormatter.format(item.price)}</Text>
                </View>
              ))}
            </View>
          );
        })}

        <View style={styles.footer}>
          <Text style={styles.footerLine}>{businessInfo.addressDisplay}</Text>
          <Text style={styles.footerLine}>
            {businessInfo.phoneDisplay} · {businessInfo.email}
          </Text>
          {businessInfo.openingHours.map((hours) => (
            <Text key={hours.label} style={styles.footerLine}>
              {hours.label}: {hours.opens} – {hours.closes}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
