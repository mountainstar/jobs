import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Review Jobs',
    tabBarIcon:  ({ tintColor }) => {
        return <Icon name="favorite" size={30} color={tintColor} />;
      },
    headerRight: (
        <Button
            title="Settings"
            onPress={() => navigation.navigate('settings')}
            backgroundColor="rgba(0,0,0,0)"
            color="rgba(0,122,255,1)"
        />
    ),
    headerStyle: {
        //If the app is running on Android assign 24 to marginTop, if not, assign 0 to marginTop
        marginTop: Platform.OS === 'android' ? 24 : 0
    }
})

renderLikedJobs() {
  return this.props.likedJobs.map(job => {
    const {
      company, formattedRelativeTime, url,
      longitude, latitude, jobtitle, jobkey } = job;
    const initialRegion = {
      longitude,
      latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    }
    return (
      <Card key={jobkey} title={jobtitle} >
        <View style={{ height: 200 }}>
        <MapView
          style={{ flex: 1 }}
          cacheEnabled={Platform.OS === 'android'}
          scrollEnabled={false}
          initialRegion={initialRegion}
        >
          <MapView.Marker
            coordinate={{ longitude: longitude, latitude: latitude }}
          />
        </MapView>
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{company}</Text>
            <Text style={styles.italics}>{formattedRelativeTime}</Text>
          </View>
          <Button
            title="Apply Now!"
            backgroundColor='#03a9f4'
            onPress={() => Linking.openURL(url)}
          />
        </View>
      </Card>
    )
  })
}
  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  italics: {
    fontStyle: 'italic',
  }
}
mapStateToProps = ({ likedJobs }) => {
  return { likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);