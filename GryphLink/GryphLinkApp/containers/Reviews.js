import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, Dimensions, View } from 'react-native';
import { Card } from 'react-native-elements';

class Reviews extends React.Component {
  static propTypes = {
    data: PropTypes.array,
  };

  render() {
    const { data } = this.props;

    return (
      <View contentContainerStyle={styles.container}>
        {data
          ? data.map((review) => {
              return (
                <Card containerStyle={styles.cardStyle} key={review.id}>
                  {/* Ratings at top */}
                  {review.ratings ? (
                    <View style={styles.ratings}>
                      {review.ratings.map((rating) => {
                        return (
                          <View key={rating.id}>
                            <Text style={{ fontWeight: 'bold' }}>{rating.name}</Text>
                            <Text style={{ alignSelf: 'center' }}>{rating.value}</Text>
                          </View>
                        );
                      })}
                    </View>
                  ) : null}
                  {/* Review text */}
                  {review.text ? (
                    <View style={styles.reviewText}>
                      <Text numberOfLines={3}>{review.text}</Text>
                    </View>
                  ) : null}
                </Card>
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  cardStyle: {
    flex: 1,
    width: Dimensions.get('window').width * 0.88,
  },
  ratings: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  reviewText: {
    justifyContent: 'center',
  },
  border: {
    borderWidth: 1, // Remove Border
    shadowColor: 'rgba(1,1,1, 0.0)', // Remove Shadow IOS
  },
});

export default Reviews;
