import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor : String!,
        $borderColor:String!,
        $borderRadius:Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin:Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor:$borderColor,
                borderRadius:$borderRadius,
                borderWidth:$borderWidth,
                padding:$padding,
                margin:$margin) {
                    lastUpdate
                }
        }
`;

// Can change all information about logos
// Show logos and how it changes while editing
class EditLogoScreen extends Component {
    
    render() {
        
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                            </h3>
                                        </div>
                                        <div class="row"> 
                                        <div class="col-6">
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, 
                                                    fontSize: parseInt(fontSize.value), backgroundColor:backgroundColor.value, 
                                                    borderColor:borderColor.value, borderRadius:parseInt(borderRadius.value),
                                                    borderWidth:parseInt(borderWidth.value), padding:parseInt(padding.value), margin:parseInt(margin.value) } });
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                                backgroundColor.value="";
                                                borderColor.value="";
                                                borderRadius.value="";
                                                borderWidth.value ="";
                                                padding.value="";
                                                margin.value="";
                                            }}>
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" onChange={() => {data.logo.text = text.value; this.setState({text: this.value})}}  className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" defaultValue={data.logo.text} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" onChange={() => {data.logo.color = color.value; this.setState({textColor: this.value})}} className="form-control" name="color" ref={node => {
                                                        color = node ;
                                                    }} placeholder="Color" defaultValue={data.logo.color}/> 
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" 
                                                    onChange={() => {data.logo.backgroundColor = backgroundColor.value; this.setState({backgroundColor: this.value})}}className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="backgroundColor" defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" onChange={() => {data.logo.fontSize = fontSize.value; this.setState({fontSize: this.value})}} className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" onChange={() => {data.logo.borderColor = borderColor.value; this.setState({borderColor: this.value})}} 
                                                    className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="borderColor" defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="text" onChange={() => {data.logo.borderRadius = borderRadius.value; this.setState({borderRadius: this.value})}} 
                                                     className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="text" onChange={() => {data.logo.borderWidth = borderWidth.value; this.setState({borderWidth: this.value})}} 
                                                    className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="text" onChange={() => {data.logo.padding = padding.value; this.setState({padding: this.value})}} 
                                                    className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="text" onChange={() => {data.logo.margin = margin.value; this.setState({margin: this.value})}} 
                                                    className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} />
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        </div>
                                        <div class="col-6"> <div style={{color:data.logo.color, backgroundColor:data.logo.backgroundColor, fontSize:data.logo.fontSize+"pt",
                                                borderColor:data.logo.borderColor, borderRadius:data.logo.borderRadius+"px",
                                                borderWidth:data.logo.borderWidth+"px",padding:data.logo.padding+"px",
                                                margin:data.logo.margin+"px", borderStyle:"solid",
                                                text: data.logo.text
                                                }}>
                                                    {data.logo.text}</div> 
                                        </div> 
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;