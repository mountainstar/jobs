import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import Swipe from '../components/Swipe';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class DeckScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Jobs',
    tabBarIcon:  ({ tintColor }) => {
        return <Icon name="description" size={30} color={tintColor} />;
      }
  }
  renderCard(job){
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    }
    return (
      <Card containerStyle={{ height: SCREEN_HEIGHT * .75 }}title={job.jobtitle}>
        <View style={{ height: SCREEN_HEIGHT * .4}}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          >
            <MapView.Marker
              coordinate={{ longitude: job.longitude, latitude: job.latitude }}
            />
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return(
      <Card title="No More Jobs">
        <Button
          title='Back To Map'
          large
          icon={{ name: 'my-location'}}
          backgroundColor='#03a9f4'
          onPress={() => this.props.navigation.navigate('maps')}
        />
      </Card>
    )
  }
  render() {
    console.log(this.props.jobs)
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp='jobkey'
          style={{ height: SCREEN_HEIGHT * .33}}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}
mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results };
}
export default connect(mapStateToProps, actions)(DeckScreen);
